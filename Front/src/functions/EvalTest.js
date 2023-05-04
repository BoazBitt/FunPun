import { Configuration, OpenAIApi } from "openai"


const EvalueateTest = async (para) => {




    const configuration = new Configuration({
        apiKey: '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',
        
    });

    const openai = new OpenAIApi(configuration);

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Grade this paragraph from 1-10 the grade should be based on these 4 criteria the score should be one for all the criterias:\nreturn ONLY: score/10\n\nSentence structure: Evaluate the complexity and accuracy of your students' sentences. Look for errors in subject-verb agreement, verb tenses, word order, and punctuation.\nVocabulary: Check if your students use a range of words and if they use them appropriately. Look for correct word usage, misspellings, and the use of synonyms and antonyms.\nFluency and coherence: Evaluate how well your students express their ideas and how well their paragraphs are organized. Look for logical flow and the use of appropriate transitions between sentences and paragraphs.\nUse of idioms and expressions: Assess if your students use any idiomatic expressions or commonly used phrases that indicate a higher level of writing skill.\n" + para,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });
        return response.data.choices[0].text
    }
    catch (err) {
        console.log(err)
    }







}

export default EvalueateTest;