import {
  ColorTags,
  GradientText,
  Project,
  Section,
  Tags,
} from 'astro-boilerplate-components';

const ProjectList = () => (
  <Section
    title={
      <>
         <GradientText>Projets</GradientText> récents
      </>
    }
  >
    <div className="flex flex-col gap-6">
      <Project
        name="Project Push-swap"
        description="Ce projet avait pour but de nous faire comprendre comment marche l'algorithme de tri, ainsi que son utilisation pour de futurs projets."
        link="https://github.com/EpitechWebAcademiePromo2024/W-ALG-502-LIL-2-1-pushswap-adrien.ritter"
        img={{
          src: '/assets/images/algo_icon.png',
          alt: 'Project Algorithmique',
          
        }}
        category={
          <>
            <Tags color={ColorTags.FUCHSIA}>PHP</Tags>
            <Tags color={ColorTags.LIME}>Algorithmique</Tags>
          </>
        }
      />
      <Project
        name="Project my_quizz"
        description="Ce projet avait pour but de nous faire aprendre le framework PHP Symfony, ainsi que son utilisation pour de futurs projets.
        Avec ce framework ne devions ouvrir un site de quizz, avec la possibilité de créer son propre quizz, et de jouer au quizz des autres utilisateurs."
        link="https://github.com/EpitechWebAcademiePromo2024/W-COL-501-LIL-1-1-quizz-adrien.ritter"
        img={{ src: '/assets/images/quizz_icon.png', alt: 'Project my_quizz' }}
        category={
          <>
            <Tags color={ColorTags.FUCHSIA}>PHP</Tags>
            <Tags color={ColorTags.EMERALD}>Symfony</Tags>
            <Tags color={ColorTags.ORANGE}>Framework</Tags>
          </>
        }
      />
      <Project
        name="Projet my_snapchat"
        description="C'est mon premier projet mobile qui avait pour but de nous faire recréer l'application snapchat, avec la possibilité de prendre des photos, de les envoyer à ses amis, et de les recevoir.
        Le tout avec react-native."
        link="https://github.com/EpitechWebAcademiePromo2024/W-JSC-502-LIL-2-1-snapchat-adrien.ritter"
        img={{ src: '/assets/images/snapchat_icone.png', alt: 'Project Maps' }}
        category={
          <>
            <Tags color={ColorTags.RED}>Javascript</Tags>
            <Tags color={ColorTags.INDIGO}>React-native</Tags>
            <Tags color={ColorTags.ORANGE}>Famework</Tags>
          </>
        }
      />
    </div>
  </Section>
);

export { ProjectList };
