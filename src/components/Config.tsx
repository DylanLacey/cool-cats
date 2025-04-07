import { useGumnutDoc, buildTestToken, GumnutText, configureGumnut } from '@gumnutdev/react';

function Config() {

    configureGumnut({
        projectId: 'cool-cats',
        localDevKey: '_DO_NOT_USE_IN_PROD_ksSKzxXfofB_pWoBoQG9bw',
        remoteHost: 'v0-collab.dev.gumnut.dev',
      });

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