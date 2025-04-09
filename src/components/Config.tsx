import { useGumnutDoc, buildTestToken, GumnutText, GumnutData } from '@gumnutdev/react';
import { useEffect } from 'react';
import { ChangeEvent } from 'react';
import { useState } from 'react';

function Config() {
    const getToken = () => buildTestToken();
    const scope = useGumnutDoc({ getToken, docId: 'config' });

    const [lastSelected, setLastSelected] = useState("lastSelected");

    const radioButtons = [
        "kitty",
        "gato",
        "chungus"
    ];

    useEffect(() => {
        const catNameElements = document.querySelectorAll('[name="catSize"]');
        
        const handleCatNameChange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            setLastSelected(target.value);
        };

        catNameElements.forEach(element => {
            element.addEventListener('change', handleCatNameChange);
        });

        return () => {
            catNameElements.forEach(element => {
                element.removeEventListener('change', handleCatNameChange);
            });
        };
    }, []);

    return (
        <div>
            <GumnutData
                control={scope.control}
                name="catBreed"
                render={(arg) => (
                    <select {...arg.field}>
                        <option value="Abbysinian">Abbysinian</option>
                        <option value="Persian">Persian</option>
                        <option value="Siamese">Siamese</option>
                    </select>
                )} 
            />

            <GumnutData
                control={scope.control}
                name="catSize"
                render={({field, state}) => (
                    <div className="flex space-x-4 mt-4">
                        {radioButtons.map(size => (
                            <label key={size} className={`flex items-center space-x-2 
                                ${state.dirty && 
                                    field.value === size && 
                                    lastSelected != size ? 'glow-underline' : ''}`
                            }>
                                <input {...field}
                                    type="radio"
                                    name="catSize"
                                    value={size}
                                    className="radio"
                                    checked={field.value === size}
                                />
                                <span className="text-sm">{size}</span>
                            </label>
                        ))}
                        {state.clients?.length > 0 && (
                            <>  
                                <span className="group">
                                    <span className="badge preset-tonal-primary">✍🏻: {state.clients.length}</span>
                                    <span className="left-full ml-2 opacity-0 transition-opacity group-hover:opacity-100 text-tonal-primary">
                                        {state.clients.join(', ')}
                                    </span>
                                </span>
                            </>
                        )}
                    </div>
                )}
            />
        </div>
    );
}

export default Config;