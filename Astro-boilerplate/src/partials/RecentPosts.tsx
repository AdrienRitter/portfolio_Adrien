import { MarkdownInstance } from 'astro';
import { Section } from 'astro-boilerplate-components';
import type { IFrontmatter } from 'astro-boilerplate-components';

type IRecentPostsProps = {
  postList: MarkdownInstance<IFrontmatter>[];
};

const RecentPosts = (props: IRecentPostsProps) => (
  <Section title="About Me">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {props.postList.map((post) => (
        <div key={post.frontmatter.title} className="overflow-hidden rounded-md bg-slate-800">
          <img
            src={post.frontmatter.imgSrc}
            alt={post.frontmatter.imgAlt}
            className="w-full transition-transform duration-300 transform hover:scale-105"
          />
          <h3 className="px-3 pt-4 pb-6 text-center">{post.frontmatter.title}</h3>
          <ul className="text-gray-400 mt-2 text-sm">
            {post.frontmatter.description.split('\n').map((item: string) => (
              <li key={item}>{item.trim()}</li>
            ))}
          </ul>
          {/* Ajoutez d'autres informations ou liens pertinents ici */}
        </div>
      ))}
    </div>
  </Section>
);

export { RecentPosts };
