import Header from "../Header";
import InfoBlock from "../AdditionalInfo";
import ResultsBlock from "../Results";
import TestingBlock from "../Form";

import './App.css';
import LighthouseCalculator from "../Calculator/components/Calculator/Calculator";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <LighthouseCalculator />
      {/* <TestingBlock />
      <InfoBlock />
      <ResultsBlock /> */}
    </>
  )
};
export default App;