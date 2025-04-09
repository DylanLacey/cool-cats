import { useState, ChangeEvent, useEffect } from 'react';
import { useGumnutDoc, buildTestToken, GumnutText, configureGumnut, GumnutStatus } from '@gumnutdev/react';

interface CatFormData {
  catName: string;
  description: string;
  coolCatValue: number;
  features: {
    floppyEars: boolean;
    boopableSnoot: boolean;
    toeBeans: boolean;
  };
}

function CatForm() {
  const [formData, setFormData] = useState<CatFormData>(() => {
    const savedData = localStorage.getItem("catFormData");
    return savedData ? JSON.parse(savedData) : {
      catName: '',
      description: '',
      coolCatValue: 150,
      features: {
        floppyEars: true,
        boopableSnoot: false,
        toeBeans: false
      }
    };
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        features: {
          ...prev.features,
          [name]: checkbox.checked
        }
      }));
    } else if (name === 'coolCatRange') {
      setFormData(prev => ({
        ...prev,
        coolCatValue: Number(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    scope.actions.commit(async ({ changes }) => {
        // "changes" contains just the dirty fields
        await (async (changes) => {
          console.log(changes);
          setSaveStatus('saving');
          localStorage.setItem("catFormData", JSON.stringify(formData));
          setSaveStatus('saved');
          setTimeout(() => setSaveStatus('idle'), 2000);
        })();
      });
  }


  const getToken = () => buildTestToken();
  const scope = useGumnutDoc({ getToken, docId: 'cool-cats' });

//   useEffect(() => {
//     if (formData !== undefined) {
//       scope.actions.load(formData);
//     }
//   }, [formData]);

  return (
    <div className="card preset-filled-surface-50-950 border-[1px] border-surface-200-800 w-full p-4">
      <div><GumnutStatus /></div>
      <div className="grid grid-cols-5 gap-4">
        <label htmlFor="catName" className="col-span-2 block text-sm font-medium">
          <span className="label-text mb-1">Cat name</span>
          <div className="flex flex-row items-center gap-2">
            <GumnutText
              control={scope.control}
              name="catName "
              value={formData.catName}
              className="p-3 input border-[1px] border-surface-300-700" 
              style={{
                background: 'white',
                border: '2px solid #eee',
                borderRadius: '4px',
              }}
            />
            {/* <input 
              type="text" 
              className="p-3 input border-[1px] border-surface-300-700" 
              placeholder="Maru" 
              id="catName" 
              name="catName"
              value={formData.catName}
              onChange={handleChange}
            /> */}
          </div>
        </label>

        <label htmlFor="description" className="col-span-5 row-span-2 block text-sm font-medium">
          <span className="label-text mb-1">Description</span>
          <div className="flex flex-row items-center gap-2">
            <textarea
              className="p-3 textarea border-[1px] border-surface-300-700" 
              id="description" 
              name="description" 
              rows={4} 
              placeholder="Extremely round and fluffy."
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </label>

        <div className="col-span-5 flex gap-8">
          <span>
            <label htmlFor="Winning Features" className="label grow flex justify-center flex-col col-span-2">
              <span className="label-text">Winning Features</span>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input 
                    className="checkbox" 
                    type="checkbox" 
                    name="floppyEars" 
                    checked={formData.features.floppyEars}
                    onChange={handleChange}
                  />
                  <p className="text-sm">Floppy Ears</p>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    className="checkbox" 
                    type="checkbox" 
                    name="boopableSnoot"
                    checked={formData.features.boopableSnoot}
                    onChange={handleChange}
                  />
                  <p className="text-sm">Boopable Snoot</p>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    className="checkbox" 
                    type="checkbox" 
                    name="toeBeans"
                    checked={formData.features.toeBeans}
                    onChange={handleChange}
                  />
                  <p className="text-sm">Toe Beans</p>
                </label>
              </div>
            </label>
          </span>

          <span className="grow">
            <label className="label grow flex justify-center flex-col col-span-2">
              <span className="label-text">Cool cat?</span>
              <input 
                className="input" 
                type="range" 
                id="coolCatRange" 
                name="coolCatRange" 
                value={formData.coolCatValue}
                min="100" 
                max="200"
                onChange={handleChange}
              />
              <div className="flex items-center justify-between mt-0">
                <span className="text-sm">Cool</span>
                <span className="text-sm">Cooler</span>
              </div>
            </label>
          </span>

          <span className="justify-self-end self-center">
            <div className="flex items-center gap-2">
              {saveStatus === 'saved' && (
                <span className="text-sm text-green-500">Saved!</span>
              )}
              <button 
                type="button" 
                className={`btn btn-base preset-tonal-secondary ${saveStatus === 'saving' ? 'opacity-50' : ''}`}
                id="save"
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
              >
                {saveStatus === 'saving' ? 'Saving...' : 'Save'}
              </button>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CatForm; 