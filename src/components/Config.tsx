import { useGumnutDoc, buildTestToken, GumnutText } from '@gumnutdev/react';

function Config() {

    const getToken = () => buildTestToken();
    const scope = useGumnutDoc({ getToken, docId: 'config' });

    return (
        <GumnutText
        control={scope.control}
        name="an-input"
        rows={4}
        resize="auto"
        multiline
        placeholder="Some data goes here"
        style={{
            background: 'white',
            border: '2px solid #eee',
            borderRadius: '4px',
        }}
        />
    )
}

export default Config;