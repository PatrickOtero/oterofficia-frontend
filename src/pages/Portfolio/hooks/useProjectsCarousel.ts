import goBarber from "../assets/goBarber.png"

export const useProjectsCarousel = () => {

    const projectsInfo = [
        {
            imageUrl: goBarber,
            name: "GoBarber (GoStack)",
            description: "A aplicação foi disponibilizada pela Rocketseat em um de seus bootcamps pagos chamado 'GoStack'. Seu figma foi disponibilizado para mim através de um amigo que possui o mesmo bootcamp. A aplicação possui front-end e back-end, ambos feitos com Javascript. O front-end foi feito com React, no modelo SPA, enquanto seu back-end foi feito com Node e Express, com banco de dados PostgreSQL, no modelo REST e MVC. A aplicação foi feita inteiramente sem o auxílio de quaisquer aulas ou tutoriais da Rocketseat (criadora do projeto), e isso pode ser constatado através do código da aplicação disponível no meu Github, que será disponibilizado no final desta descrição, onde pode ser visto que toda a estrutura do código e a forma como foi feita é diferente, além de optar por não usar Typescript, pelo fato de não ter segurança para trabalhar com o citado superset na época em que eu o fiz. Foi uma experiência difícil, mas uma experiência que me forneceu muita prática."
        }
    ]
    return { projectsInfo }
}