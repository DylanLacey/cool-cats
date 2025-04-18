import { booleanLiteral } from '@babel/types';
import type { GumnutNode, GumnutDoc, GetToken } from '@gumnutdev/api';
import { type ChangeEvent, type FC, useEffect, useRef, useState } from 'react';

import { createContext, useContext } from 'react';
const GumnutDocContext = createContext<GumnutDoc | undefined>(undefined);

type UseGumnutDoc = {
    docId: string;
    getToken: GetToken;
    initialToken?: GetToken | Promise<string> | string;
  };

   type ControlType = { [k: symbol]: any };
  
   const actualDoc = Symbol.for('actualDoc');

const useGumnutDocInternal = (arg?: ControlType): GumnutDoc | undefined => {
  if (arg) {
    // return arg[actualDoc] as GumnutDoc;
    const keys = Object.getOwnPropertySymbols(arg);
    return arg[keys[0]] as GumnutDoc;
  }
  return useContext(GumnutDocContext);
};



export type RenderGumnutSingleFunc = (arg: {
  field: {
    onChange: (e: ChangeEvent) => any; //
    onFocus: () => any;
    value: string;

    /**
     * Simply whether the value is non-blank.
     * For `<input type="checkbox" />`.
     */
    checked: boolean;
  };

  actions: {
    replaceWith(s: string): void;
    focus(): void;
  };

  state: {
    /**
     * The underlying value of this data node.
     */
    value: string;

    /**
     * Whether this node is dirty, modified from canonical state.
     */
    dirty: boolean;

    /**
     * The clients currently focused on this node.
     */
    clients: Readonly<string[]>;

    /**
     * The last user selected value.
     */
    highlightField: string;
  };
}) => any;

const choices = {
  kitty: { label: "Kitty!" },
  chungus: { label: "Chungus!" },
  big: { label: "Big!" },
  small: { label: "Small!" },
}

export type GumnutSingleChoiceProps = {
  name: string;
  highlightOnRestore?: boolean;
  render: RenderGumnutSingleFunc;

  /**
   * Instead of wrapping in {@link GumnutScope}, you can set the controller here.
   */
  control?: ControlType;
};

export const GumnutSingleChoice: FC<GumnutSingleChoiceProps> = (props) => {
  const lastSelected = useRef<{value: string, isNew: boolean}>({value: '', isNew: false});
  const doc = useGumnutDocInternal(props.control);

  const nodeRef = useRef<GumnutNode>(null);
  const [value, setValue] = useState<string>('');
  const [dirty, setDirty] = useState<boolean>(false);
  const [clients, setClients] = useState<string[]>([]);
  const [highlightField, setHighlightField] = useState<string>('');

  useEffect(() => {
    const node = doc?.useNode(props.name);
    if (!node) {
      nodeRef.current = null;
      return;
    }

    const c = new AbortController();
    nodeRef.current = node;
    
    const refreshValue = () => {
      setValue(node.contents());
      setDirty(node.isDirty());

      if (node.isDirty()) {
        const currentValue = node.contents();
        const lastValue = lastSelected.current.value;

        // Clear isNew flag if value changed since last selection
        if (currentValue !== lastValue && lastSelected.current.isNew) {
          lastSelected.current.isNew = false;
        }

        // Only handle highlighting for non-new selections
        if (!lastSelected.current.isNew) {
          // Value restored to previous selection
          if (currentValue === lastValue) {
            if (props.highlightOnRestore) {
              setHighlightField(currentValue);
            }
            lastSelected.current.value = "BHBB"; // Reset last selected value
          } else {
            // Value changed to something else
            setHighlightField(currentValue);
          }
        }
      }
    };
    nodeRef.current.addListener('value', refreshValue, c.signal);
    refreshValue();

    const refreshClients = () => setClients([...node.clients()]);
    nodeRef.current.addListener('clients', refreshClients, c.signal);
    refreshClients();

    return () => c.abort();
  }, [props.name, doc]);


  return props.render({
    field: {
      onChange(e: ChangeEvent) {
        let value = 'value' in e.target ? e.target.value : undefined;

        if (e.target instanceof HTMLInputElement) {
          const i = e.target;
          switch (i.type) {
            case 'checkbox':
              value = i.checked ? i.value || 'on' : '';
              break;
          }
        }

        if (typeof value === 'string') {
          lastSelected.current = {value: value, isNew: true};
          nodeRef.current?.replaceWith(value);
        }
      },
      onFocus() {
        // TODO: select all?
        nodeRef.current?.placeCursor(0);
      },
      value,
      checked: Boolean(value),
    },
    actions: {
      replaceWith(s) {
        nodeRef.current?.replaceWith(s);
      },
      focus() {
        nodeRef.current?.placeCursor(0);
      },
    },
    state: {
      dirty,
      clients,
      value,
      highlightField,
    },
  });
};