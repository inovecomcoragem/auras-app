const path = require('path');
const Question = require('../models/question.model');
const Option = require('../models/option.model');
const Profile = require('../models/profile.model');
const seeder = require('mongoose-seed');

seeder.connect(process.env.MONGODB_URI || 'mongodb://localhost/auras', () => {
    seeder.loadModels([
        path.resolve(__dirname, '../models/question.model.js'),
        path.resolve(__dirname, '../models/option.model.js'),
        path.resolve(__dirname, '../models/profile.model.js'),
    ]);

    seeder.clearModels(['question', 'option', 'profile'], function () {

        seeder.populateModels(data, function () {
            seeder.disconnect();
        });
    });
});


let data = [
    {
        'model': 'question',
        'documents': []
    },
    {
        'model': 'option',
        'documents': []
    },
    {
        'model': 'profile',
        'documents': []
    }
];

function setQuestion(question, options) {
    const questionModel = new Question(question);

    for (const option of options) {
        const optionModel = new Option(option);
        optionModel.questionId = questionModel._id;

        questionModel.options.push(optionModel);
        data[1].documents.push(optionModel);
    }

    data[0].documents.push(questionModel);
}

function setProfile(title, text, identifier) {
    const profile = new Profile({
        title: title,
        description: text,
        identifier: identifier
    });

    data[2].documents.push(profile);
}

setProfile(
    'Geradora de Interações', 
    'Você acredita que as novas formas de interação entre pessoas e máquinas transformarão a maneira como vivemos e nos relacionamos, criando novas possibilidades de engajamento para as marcas. Assistentes de voz, ausência de telas e IoT são só algumas das tecnologias que possibilitam esse mundo novo que você quer criar. A ThoughtWorks pode te acompanhar nessa jornada, desenvolvendo softwares personalizados para que você continue inovando com coragem.',
    'GERADORA_INTERACOES'
);

setProfile(
    'Engenheira de Hábitos', 
    'Você é responsável por criar novas formas de interação entre pessoas e máquinas, transformando a maneira como vivemos e nos relacionamos. Suas habilidades criam novas possibilidades de engajamento para as marcas. Com grandes poderes você também tem grandes responsabilidades. A ThoughtWorks pode te ajudar a desenvolver essas novas tecnologias, garantindo segurança e excelência técnica, ao mesmo tempo em que buscamos evitar os vieses cognitivos para inovar com responsabilidade. ',
    'ENGENHEIRA_HABITOS'
);

setProfile(
    'Formadora de Plataformas', 
    'Você acredita que plataformas digitais possibilitam a inovação em escala através da utilização estratégica do legado tecnológico de uma organização. Seu pensamento sistêmico é capaz de garantir a competitividade de uma marca no longo prazo. A ThoughtWorks pode te ajudar a remover barreiras para habilitar a entrega rápida de novos produtos e criar diferenciação por meio da tecnologia.',
    'FORMADORA_PLATAFORMAS'
);

setProfile(
    'Criadora de Possibilidades', 
    'Você cria plataformas digitais que possibilitam a inovação em escala por meio da utilização estratégica do legado tecnológico de uma organização. Seu conhecimento técnico aliado ao seu pensamento sistêmico são capazes de garantir a competitividade de uma marca no longo prazo. A ThoughtWorks te ajuda a remover barreiras para habilitar a entrega rápida de novos produtos e criar diferenciação através da tecnologia.',
    'CRIADORA_POSSIBILIDADES'
);

setProfile(
    'Guardiã dos Dados', 
    'Você ama dados e sabe como usá-los. Sua curiosidade só é satisfeita quando você se sente capaz de responder perguntas com fatos e dados. Essa dedicação à verdade te torna responsável por alavancar soluções inovadoras para os desafios de sua organização. A ThoughtWorks pode te ajudar a criar novas ferramentas que utilizam informação e tecnologia para gerar diferenciação competitiva.',
    'GUARDIA_DADOS'
);

setProfile(
    'Mestra dos Números', 
    'Você é uma pessoa pragmática que acredita que os números têm as respostas. Sua curiosidade só é satisfeita quando você se sente capaz de desenvolver sistemas que respondem perguntas com precisão. Essa dedicação à verdade te torna responsável por desenvolver soluções inovadoras para os desafios de sua organização. A ThoughtWorks pode te ajudar a criar novas ferramentas que utilizam informação e tecnologia para gerar diferenciação competitiva.',
    'MESTRA_NUMEROS'
);

setProfile(
    'Criadora do Novo', 
    'Você acredita que a inovação precisa ser centrada na pessoa usuária e busca sempre responder aos desafios de sua organização pensando nas pessoas. Seu foco em criar novas experiências que respondam a anseios existentes te posiciona como uma pessoa chave para qualquer empresa que queira ser competitiva no futuro. A ThoughtWorks pode te ajudar nessa missão de entender as necessidades humanas para criar produtos e serviços apaixonantes.',
    'CRIADORA_NOVO'
);

setProfile(
    'Realizadora de Possibilidades', 
    'Você inova sempre pensando na pessoa usuária, respondendo aos desafios da sua organização pensando nas pessoas. Seu conhecimento é capaz de criar novas experiências que respondem a anseios existentes e te posiciona como uma pessoa chave para qualquer empresa que queira ser competitiva no futuro. A ThoughtWorks pode te ajudar nessa missão de entender as necessidades humanas para desenvolver produtos e serviços apaixonantes.',
    'REALIZADORA_POSSIBILIDADES'
);

setProfile(
    'Mestra de Robôs', 
    'Você acredita na capacidade dos robôs de ajudar organizações a se manterem competitivas no presente e no futuro. A singularidade não é um medo, e sim uma oportunidade. Você conhece os desafios da cooperação entre pessoas e máquinas e está disposta a liderar esse movimento. Você inova como uma rebelde. A ThoughtWorks pode te ajudar a entender como usar a tecnologia para alavancar os negócios. ',
    'MESTRA_ROBOS'
);

setProfile(
    'Líder das Máquinas', 
    'Você sabe como fazer as máquinas ajudarem organizações a se manterem competitivas no presente e no futuro. A singularidade não é um medo, e sim uma oportunidade. Seu conhecimento te permite criar a cooperação entre pessoas e máquinas, liderando esse movimento com ética e responsabilidade. Você inova como uma rebelde. A ThoughtWorks pode te ajudar a entender como usar a tecnologia para alavancar os negócios.',
    'LIDER_MAQUINAS'
);

setQuestion({
    'description': 'Com qual dessas macrotendências tecnológicas você mais se identifica? ',
    'order': 0,
    'options': [],
    'type': 'TREND',
    'weight': 2
},
[{
    'description': 'Interações em evolução',
    'value': 'EVO_INTER'
},
{
    'description': 'Crescimento das Plataformas',
    'value': 'RISE_PLAT'
},
{
    'description': 'Segurança, privacidade e transparência',
    'value': 'SEC_PRIV'
},
{
    'description': 'Físico. Agora digital.',
    'value': 'HUMAN_AUG'
},
{
    'description': 'Humanidade aumentada',
    'value': 'RISE_ROBOT'
}]
);

setQuestion({
    'description': 'Qual dessas tecnologias produzirá o maior impacto no ecosistema de TI?',
    'order': 1,
    'options': [],
    'type': 'TREND',
    'weight': 1
},
[{
    'description': 'Assistentes de Voz',
    'value': 'EVO_INTER'
},
{
    'description': 'SAAS',
    'value': 'RISE_PLAT'
},
{
    'description': 'Blockchain',
    'value': 'SEC_PRIV'
},
{
    'description': 'Biohacking',
    'value': 'HUMAN_AUG'
},
{
    'description': 'Machine Learning',
    'value': 'RISE_ROBOT'
}]
);

setQuestion({
    'options': [],
    'description': 'O que você sente diante das transformações tecnológicas atuais?',
    'order': 2,
    'type': 'TREND',
    'weight': 0
},
[{
    'description': 'Curiosidade',
    'value': 'Curiosidade'
},
{
    'description': 'Impulso de aprender',
    'value': 'Impulso de aprender'
},
{
    'description': 'Inspiração',
    'value': 'Inspiração'
},
{
    'description': 'Receio',
    'value': 'Receio'
},
{
    'description': 'Oportunidades',
    'value': 'Oportunidades'
}]
);

setQuestion({
    'description': 'Diante dessas mudanças, qual o seu maior foco?',
    'order': 3,
    'type': 'PROFILE',
    'weight': 0,
    'options': []
},
[{
    'description': 'Criar coisas novas',
    'value': 'Criar coisas novas'
},
{
    'description': 'Desenvolver habilidades',
    'value': 'Desenvolver habilidades'
},
{
    'description': 'Impulsionar a mudança',
    'value': 'Impulsionar a mudança'
},
{
    'description': 'Aprender na prática',
    'value': 'Aprender na prática'
},
{
    'description': 'Aproveitar possibilidades',
    'value': 'Aproveitar possibilidades'
}]
);

setQuestion({
    'description': 'Qual a sua área de atuação?',
    'order': 4,
    'type': 'PROFILE',
    'weight': 0.5,
    'options': []
},
[{
    'description': 'Marketing',
    'value': 0.2,
},
{
    'description': 'Tecnologia',
    'value': 1.0,
},
{
    'description': 'Pessoas',
    'value': 0.0,
},
{
    'description': 'Produtos',
    'value': 0.5,
},
{
    'description': 'Compliance',
    'value': 0.7,
}]
);


setQuestion({
    'options': [],
    'description': 'Quais são seus maiores desafios atualmente?',
    'order': 5,
    'type': 'PROFILE',
    'weight': 0.5
},
[{
    'description': 'Agir com agilidade',
    'value': 0.5,
},
{
    'description': 'Implementar inovações',
    'value': 1.0,
},
{
    'description': 'Gerar valor ao negócio',
    'value': 0.7,
},
{
    'description': 'Entender novas tecnologias',
    'value': 0.3,
},
{
    'description': 'Aprender linguagens',
    'value': 0.0,
}]
);

