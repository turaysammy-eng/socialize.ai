-- Seed Data for Local Development & Testing

INSERT INTO public.profiles (id, username, display_name, bio, location, github_url, skills, experience_level)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'alice_dev', 'Alice Smith', 'Full-stack developer building open source social platforms.', 'San Francisco, CA', 'https://github.com/alicedev', ARRAY['TypeScript', 'React', 'Next.js', 'PostgreSQL'], 'senior'),
  ('00000000-0000-0000-0000-000000000002', 'bob_builder', 'Bob Jones', 'Systems engineer & Rust enthusiast.', 'Austin, TX', 'https://github.com/bobb', ARRAY['Rust', 'Go', 'Docker', 'Kubernetes'], 'lead')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.projects (id, owner_id, name, slug, description, repository_url, primary_language, topics, status)
VALUES
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000001', 'Socialize App', 'socialize-app', 'A production-grade developer collaboration platform.', 'https://github.com/socialize/socialize', 'TypeScript', ARRAY['nextjs', 'supabase', 'react', 'tailwind'], 'looking_for_contributors')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.communities (id, owner_id, name, slug, description)
VALUES
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000001', 'Next.js Developers', 'nextjs-devs', 'Community hub for Next.js App Router and full-stack React developers.')
ON CONFLICT (id) DO NOTHING;
