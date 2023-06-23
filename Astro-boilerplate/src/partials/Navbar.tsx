import {
  Logo,
  NavbarTwoColumns,
  NavMenu,
  NavMenuItem,
  Section,
} from 'astro-boilerplate-components';

const Navbar = () => (
  <Section>
    <NavbarTwoColumns>
      <a href="assets/images/Adrien Ritter.pdf" target='_blank'>
        <Logo
          icon={
            <svg
              className="mr-1 h-10 w-10 stroke-purple-600 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M0 0h24v24H0z" stroke="none" />
              <path d="M5 4h14v16H5z" />
              <path d="M5 12h14" />
              <path d="M5 16h14" />
              <path d="M5 8h14" />
              <path d="M5 20h14" />
              <path d="M5 6h14M5 10h14" stroke="#888888" />
            </svg>
          }
          name={
            <span className="inline-block transition duration-300 transform hover:-translate-y-1">
              Télécharger mon CV
            </span>
          }
        />
      </a>

      <NavMenu>
        <div className='flex mr-20 gap-8'>
          <NavMenuItem href="https://www.linkedin.com/feed/" >Linkedin</NavMenuItem>
          <NavMenuItem href="https://github.com/">GitHub</NavMenuItem>
          <NavMenuItem href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Youtube</NavMenuItem>
        </div>
      </NavMenu>
    </NavbarTwoColumns>
  </Section>
);

export { Navbar };
