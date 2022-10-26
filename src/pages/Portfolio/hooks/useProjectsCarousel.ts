import goBarber from "../assets/goBarber.png"
import dindin from "../assets/dindin.jpeg"
import kontacts from "../assets/kontacts.jpeg"
import blox from "../assets/blox.jpeg"
import omnix from "../assets/omnix.jpeg"


export const useProjectsCarousel = () => {

    const projectsInfo = [
        {
            imageUrl: goBarber,
            name: "GoBarber",
            description: "A aplicação foi disponibilizada pela Rocketseat em um de seus bootcamps pagos chamado 'GoStack'. Seu figma foi disponibilizado para mim através de um amigo que possui o mesmo bootcamp. A aplicação possui front-end e back-end, ambos feitos com Javascript. O front-end foi feito com React, no modelo SPA, enquanto seu back-end foi feito com Node e Express, com banco de dados PostgreSQL, no modelo REST e MVC. A aplicação foi feita inteiramente sem o auxílio de quaisquer aulas ou tutoriais da Rocketseat (criadora do projeto), e isso pode ser constatado através do código da aplicação disponível no meu Github, que será disponibilizado no final desta descrição, onde pode ser visto que toda a estrutura do código e a forma como foi feita é diferente, além de optar por não usar Typescript, pelo fato de não ter segurança para trabalhar com o citado superset na época em que eu o fiz. Foi uma experiência difícil, mas uma experiência que me forneceu muita prática.",
            frontendUrl: "https://github.com/PatrickOtero/Go-Barber-front-end",
            backendUrl: "https://github.com/PatrickOtero/Go-Barber-back-end",
        },
        {
            imageUrl: dindin,
            name: "Dindin",
            description: "Essa aplicação foi inicialmente proposta como o terceiro desafio de front-end do curso de desenvolvimento de softwares da edtech Cubos Academy, e foi feita com React simples, sem rotas ou contexto e sem a necessidade de criação de uma API, pois parte do desafio era o consumo de apis, e essa api havia sido fornecida para tal. Consiste num sistema de registro de movimentações financeiras simples, com cálculo de entrada e saída, tipos de gastos/ganhos, ordenação por data e dia da semana e filtragem cumulativa por dias da semana, categoria de gastos/ganhos e valor. Na época que fiz o desafio, todo o código estava em um único arquivo, pois eu ainda não sabia componentizar e havia apenas a página simples, com o sistema. Quando terminei o curso, componentizei totalmente a aplicação, adicionei um sistema de login e cadastro de usuários, construi uma api própria, do zero, com banco de dados PostgreSQL, adicionei rotas com react-router-dom, context api e animações css mais avançadas. Foi uma prática muito boa aprimorar esse sisteminha após ter obtido mais conhecimento. Apesar disso, ainda pretendo adicionar mais coisas nele, como testes com Jest e responsividade, além de reescrevê-lo todo com Typescript, assim como é este site que você está nesse momento.",
            frontendUrl: "https://github.com/PatrickOtero/App-Dindin",
            backendUrl: "https://github.com/PatrickOtero/API-Dindin",
        },
        {
            imageUrl: kontacts,
            name: "Kontacts",
            description: "Aplicação proposta como mini desafio antes do desafio final na Cubos Academy. É uma aplicação full-stack feita por mim. É um simples sistema de organização de contatos, com sistema de login e cadastro feita com React, em modelo SPA no front-end e com Node e express, com PostgreSQL no back-end.",
            frontendUrl: "https://github.com/PatrickOtero/Kontacts-App",
            backendUrl: "https://github.com/PatrickOtero/Kontacts-API",
        },
        {
            imageUrl: blox,
            name: "Desafio Blox",
            description: "A empresa Blox propôs um simples sistema de listagem de unidades curriculares, simulando uma plataforma de ensino. O App foi feito com React, Typescript, Styled-components e Material-ui e Axios para consumir a api fornecida pela empresa.",
            frontendUrl: "https://github.com/PatrickOtero/blox-frontend-challenge",
            backendUrl: "",
        },
        {
            imageUrl: omnix,
            name: "Desafio da Omnix",
            description: "Este é um simples sistema para simular a exibição de planos de uma empresa de internet para o usuário de acordo com a sua localidade. A aplicação foi feita com  React, Typescript, Styled-components e Material-ui e axios para consumir a api ViaCep.",
            frontendUrl: "https://github.com/PatrickOtero/Omnix-challenge",
            backendUrl: "",
        }
    ]
    return { projectsInfo }
}