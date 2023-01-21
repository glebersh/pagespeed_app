import Header from "../Header";
import ResultsBlock from "../ResultsBlock";
import TestingBlock from "../TestingBlock/TestingBlock";
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <TestingBlock />
      <ResultsBlock />
    </>
  )
};
export default App;