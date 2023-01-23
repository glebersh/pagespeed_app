import Header from "../Header";
import InfoBlock from "../InfoBlock/InfoBlock";
import ResultsBlock from "../ResultsBlock";
import TestingBlock from "../TestingBlock/TestingBlock";
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <TestingBlock />
      <InfoBlock />
      <ResultsBlock />
    </>
  )
};
export default App;