Responses = {
    yes: 0,
    probably: 1,
    idk: 2,
    probablynot: 3,
    no: 4,
    replay: 'replay',
    goback: 'goback'
};

ResponsesDisplay = ["Yes", "Probably", "I don't know", "Probably not", "No"];

ColorArray = ['#58B26C', '#f76352', '#419895', '#446DAB', '#B1B325'];

ScoringValueMatrice = [
[ 3, 1, -1, -2, -3 ],
[ 1, 3, 1, -1, -2 ],
[ -1, 1, 3, 1, -1 ],
[ -2, -1, 1, 3, 1 ],
[ -3, -2, -1, 1, 3 ]];