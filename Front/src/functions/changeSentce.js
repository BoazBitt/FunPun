export const changeSentence = (sentences) => {
    console.log(sentences)
    const newSentnce = []
    let idc = 1;
    for (let i = 0; i < sentences.length; i++) {
        console.log("in loop")
        const [englishWord, hebrewWord] = sentences[i].word.split(' = ');
        const obj1 = { id: idc, content: englishWord, stat: "" };
        const obj2 = { id: idc, content: hebrewWord, stat: "" };
        idc++;
        newSentnce.push(obj1);
        newSentnce.push(obj2);

    }
    console.log("done w loop",newSentnce)


    return newSentnce
}