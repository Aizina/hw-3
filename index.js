//TASK 1 

const parser = new DOMParser();

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>

  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");
const studentNodes = xmlDOM.querySelectorAll("student");

const result = {
  list: [],
};

studentNodes.forEach((studentNode) => {
  const nameNode = studentNode.querySelector("name");
  const firstNode = nameNode.querySelector("first");
  const secondNode = nameNode.querySelector("second");
  const ageNode = studentNode.querySelector("age");
  const profNode = studentNode.querySelector("prof");
  const langAttr = nameNode.getAttribute('lang');

  const fullName = `${firstNode.textContent} ${secondNode.textContent}`;
  const student = {
    name: fullName,
    age: ageNode.textContent,
    prof: profNode.textContent,
    lang: langAttr,
  };

  result.list.push(student);
});

console.log('result', result);


//TASK2


const jsonString = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]

}
`;

const data = JSON.parse(jsonString);
const list = data.list;
console.log('list', list);
const result2 = list;
console.log('result', result2);


//TASK 3

const container = document.createElement('div');
container.classList.add('container');
document.body.appendChild(container);

const heading = document.createElement('h2');
heading.textContent = 'Введите число от 1 до 10:';
container.appendChild(heading);

const numberInput = document.createElement('input');
numberInput.type = 'number';
numberInput.min = 1;
numberInput.max = 10;
container.appendChild(numberInput);

const submitButton = document.createElement('button');
submitButton.textContent = 'Получить картинки';
container.appendChild(submitButton);

const resultDiv = document.createElement('div');
container.appendChild(resultDiv);

submitButton.addEventListener('click', function () {
    const number = parseInt(numberInput.value, 10);

    if (number >= 1 && number <= 10) {
        const url = `https://picsum.photos/v2/list?limit=${number}`;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);

                resultDiv.innerHTML = '';

                data.forEach(function (item) {
                    const image = document.createElement('img');
                    image.src = item.download_url;
                    resultDiv.appendChild(image);
                });
            } else {
                resultDiv.innerHTML = 'Произошла ошибка при загрузке изображений.';
            }
        };

        xhr.send();
    } else {
        resultDiv.innerHTML = 'Число вне диапазона от 1 до 10.';
    }
});

