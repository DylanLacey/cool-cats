import './App.css'
import CatForm from './components/CatForm'

function App() {
  return (
    <div className="grid m-8">
      <header className="mb-6">
        <h1 className="h1 flex items-center">
          <span>Cool Cats with Gumnut</span>             
          <img src="noun-shepherd.svg" alt="🐈" className="h-18 ml-2" />
        </h1>
      </header>
      
      <main>
        <CatForm />
      </main>
    </div>
  )
}

export default App
