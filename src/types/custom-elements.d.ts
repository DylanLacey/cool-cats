declare namespace JSX {
  interface IntrinsicElements {
    'gumnut-text': React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
      multiline?: boolean;
      resize?: string;
    };
    'gumnut-data': React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  }
} 