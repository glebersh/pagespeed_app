import Hero from "../Hero";
import MainBlock from "../Main/Main";
import ResultsBlock from "../ResultsBlock";
import TestingBlock from "../TestingBlock/TestingBlock";
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <Hero />
      <TestingBlock />
      <ResultsBlock />
    </>
  )
};
export default App;