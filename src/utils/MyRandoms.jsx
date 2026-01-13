

export function generateRandomNumber(){
    let Answers = {
        toString_36: Math.random().toString(36),
        toString_36_slice_2: Math.random().toString(36).slice(2),
        toString_36_slice_2_upTo_10: Math.random().toString(36).slice(2,10),
        toFixed_8: Math.random().toFixed(8),
        toFixed_4: Math.random().toFixed(4),
        toFixed_2: Math.random().toFixed(2),
    };

    return Answers;
};

export function randomHex32(){
    const bytes = new Uint8Array(16); // 16 bytes = 128 bits = 32 hex chars
    crypto.getRandomValues(bytes);
    return [...bytes].map(b => b.toString(16).padStart(2, "0")).join("");
};

// This doesn't render html, it renders a string.
export function getNumberListEl1(){
  const jsonNumList = generateRandomNumber();
  var ListElement = '<ul>';
  for (const [key, value] of Object.entries(jsonNumList)) {
    ListElement += `<li>${key} : ${value}</li>`;
  }
  ListElement += '</ul>';
  return ListElement;
};

// This renders html elements, and is verbose.
export function getNumberListEl2(){
  const jsonNumList = generateRandomNumber();
  var entriesArray = Object.entries(jsonNumList);
  var listItemElements = [];
  for (var i = 0; i < entriesArray.length; i += 1) {
    var currentEntry = entriesArray[i];
    var key = currentEntry[0];
    var value = currentEntry[1];
    var listItemElement = <li key={key}>{key + " : " + value}</li>;
    listItemElements.push(listItemElement);
  }
  var unorderedListElement = <ul>{listItemElements}</ul>;
  return unorderedListElement;
}

// This renders html and utilizes a map function to parse the entries.
export function getNumberListEl3(){
  const jsonNumList = generateRandomNumber();
  return (
    <ul>
      {Object.entries(jsonNumList).map(function(entry) {
        const key = entry[0];
        const value = entry[1];
        return <li key={key}>{key + " : " + value}</li>;
      })}
    </ul>
  );
};

// This renders html and utilizes a map function with destructuring.
export function getNumberListEl4() {
  const jsonNumList = generateRandomNumber();
  return (
    <ul>
      {Object.entries(jsonNumList).map(([key, value]) => (
        <li key={key}>{`${key} : ${value}`}</li>
      ))}
    </ul>
  );
};
