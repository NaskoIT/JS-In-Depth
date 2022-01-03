const value = 123;
const str = `The values is: ${value}`;

function tag(staticParts, ...dynamicParts) {
    return staticParts
        .map((str, index) => {
            if (index < dynamicParts.length) {
                return `${str}{{${dynamicParts[index]}}}`
            }

            return str;
        })
        .join('');
}

const dynamicValue = 100;
const result = tag`Js test => ${dynamicValue}, another value: ${dynamicValue + 100}`;
console.log(result);
