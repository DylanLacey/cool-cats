import { configureGumnut } from '@gumnutdev/react';
import './App.css'
import CatForm from './components/CatForm'
import Config from './components/Config'
import SingleConfig from './components/SingleConfig';


function App() {

  configureGumnut({
    projectId: 'cool-cats',
    localDevKey: '_DO_NOT_USE_IN_PROD_ksSKzxXfofB_pWoBoQG9bw',
    remoteHost: 'v0-collab.dev.gumnut.dev',
  });

    
  return (
    <div className="grid m-8">
      <header className="mb-6">
        <h1 className="h1 flex items-center">
          <span>Cool Cats with Gumnut</span>             
          <img src="noun-shepherd.svg" alt="🐈" className="h-18 ml-2" />
        </h1>
      </header>
      
      <main>
        {/* <CatForm /> */}
        <SingleConfig />
      </main>
    </div>
  )
}

export default App
