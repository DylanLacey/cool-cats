import { useGumnutDoc, buildTestToken, GumnutText, GumnutData } from '@gumnutdev/react';

function Config() {
    const getToken = () => buildTestToken();
    const scope = useGumnutDoc({ getToken, docId: 'config' });


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
                render={(arg) => (
                    <div className="flex space-x-4 mt-4">
                        <label className={`flex items-center space-x-2 ${arg.state.dirty && arg.field.value === 'kitty' ? 'glow-underline' : ''}`}>
                            <input {...arg.field}
                                type="radio"
                                name="catSize"
                                value="kitty"
                                className="radio"
                                checked={arg.field.value === 'kitty'}
                            />
                            <span className="text-sm">Kitty!</span>
                        </label>
                        <label className={`flex items-center space-x-2 ${arg.state.dirty && arg.field.value === 'gato' ? 'glow-underline' : ''}`}>
                            <input {...arg.field}
                                type="radio"
                                name="catSize"
                                value="gato"
                                className="radio"
                                checked={arg.field.value === 'gato'}
                            />
                            <span className="text-sm">Gato</span>
                        </label>
                        <label className={`flex items-center space-x-2 ${arg.state.dirty && arg.field.value === 'chungus' ? 'glow-underline' : ''}`}>
                            <input {...arg.field}
                                type="radio"
                                name="catSize"
                                value="chungus"
                                className="radio checked:glow-underline"
                                checked={arg.field.value === 'chungus'}
                            />
                            <span className="text-sm">Chungus</span>
                        </label>
                        {arg.state.clients?.length > 0 && (
                            <>  
                                <span className="vr border-l-2 border-primary-500"></span>
                                <span className="group relative">
                                    <span className="badge preset-tonal-primary">✍🏻: {arg.state.clients.length}</span>
                                    <span className="absolute left-full ml-2 whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
                                    {arg.state.clients.join(', ')}
                                    </span>
                                </span>
                            </>
                        )}
                    </div>
                )}
            />
        </div>
    )
}

export default Config;