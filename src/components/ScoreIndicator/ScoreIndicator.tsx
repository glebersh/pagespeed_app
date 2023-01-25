import './ScoreIndicator.css';

type ScoreProps = {
  score: number | string,
};

const ScoreIndicator = ({ score }: ScoreProps) => {

  const determineCategory = (score: number | string): string => {
    if (Number(score) * 100 >= 90) {
      return 'high_score';
    }
    else if (Number(score) * 100 >= 50 && Number(score) < 90) {
      return 'middle_score';
    }
    else return 'low_score';
  };

  return (
    <div className={`score_border ${determineCategory(score)}`}>
      <div className='score_indicator'>
        {(Number(score) * 100).toFixed(0)}
      </div>
    </div>
  )
};
export default ScoreIndicator;