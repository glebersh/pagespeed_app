import Header from "../Header";
import InfoBlock from "../AdditionalInfo";
import ResultsBlock from "../Results";
import TestingBlock from "../Form";

import './App.css';
import LighthouseCalculator from "../Calculator";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <LighthouseCalculator />
      <InfoBlock />
      <TestingBlock />
      <ResultsBlock />
    </>
  )
};
export default App;