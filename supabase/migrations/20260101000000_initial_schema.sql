-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  bio TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  location TEXT DEFAULT '',
  website_url TEXT DEFAULT '',
  github_url TEXT DEFAULT '',
  skills TEXT[] DEFAULT '{}',
  experience_level TEXT DEFAULT 'intermediate',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. USER FOLLOWS
CREATE TABLE IF NOT EXISTS public.user_follows (
  follower_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id),
  CONSTRAINT prevent_self_follow CHECK (follower_id <> following_id)
);

-- 3. PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  repository_url TEXT NOT NULL DEFAULT '',
  website_url TEXT DEFAULT '',
  license TEXT DEFAULT 'MIT',
  visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'private')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived', 'maintenance', 'looking_for_contributors')),
  primary_language TEXT DEFAULT '',
  topics TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. PROJECT MEMBERS
CREATE TABLE IF NOT EXISTS public.project_members (
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'contributor' CHECK (role IN ('owner', 'admin', 'contributor', 'viewer')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (project_id, user_id)
);

-- 5. COMMUNITIES
CREATE TABLE IF NOT EXISTS public.communities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  avatar_url TEXT DEFAULT '',
  banner_url TEXT DEFAULT '',
  visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'private')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. COMMUNITY MEMBERS
CREATE TABLE IF NOT EXISTS public.community_members (
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'moderator', 'member')),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (community_id, user_id)
);

-- 7. POSTS / DISCUSSIONS
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  community_id UUID REFERENCES public.communities(id) ON DELETE SET NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  post_type TEXT NOT NULL DEFAULT 'discussion' CHECK (post_type IN ('discussion', 'announcement', 'question', 'showcase')),
  visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'private')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. COMMENTS
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- 9. REACTIONS
CREATE TABLE IF NOT EXISTS public.reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('post', 'comment')),
  target_id UUID NOT NULL,
  reaction_type TEXT NOT NULL DEFAULT 'like' CHECK (reaction_type IN ('like', 'heart', 'rocket', 'fire')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, target_type, target_id, reaction_type)
);

-- 10. BOOKMARKS
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('post', 'project')),
  target_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, target_type, target_id)
);

-- 11. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  actor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  read_at TIMESTAMPTZ DEFAULT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. PROJECT COLLABORATION REQUESTS
CREATE TABLE IF NOT EXISTS public.project_collaboration_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  requester_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  request_type TEXT NOT NULL DEFAULT 'contributor' CHECK (request_type IN ('contributor', 'maintainer', 'support')),
  message TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. REPORTS
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('post', 'comment', 'user', 'project', 'community')),
  target_id UUID NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'dismissed', 'actioned')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. MODERATION ACTIONS
CREATE TABLE IF NOT EXISTS public.moderation_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  moderator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('post', 'comment', 'user', 'project', 'community')),
  target_id UUID NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('warning', 'remove_content', 'ban_user', 'dismiss')),
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_owner ON public.projects(owner_id);
CREATE INDEX IF NOT EXISTS idx_communities_slug ON public.communities(slug);
CREATE INDEX IF NOT EXISTS idx_posts_author ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_community ON public.posts(community_id);
CREATE INDEX IF NOT EXISTS idx_posts_project ON public.posts(project_id);
CREATE INDEX IF NOT EXISTS idx_comments_post ON public.comments(post_id);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON public.notifications(recipient_id);

-- ENABLE ROW LEVEL SECURITY ON ALL TABLES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_collaboration_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderation_actions ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY profiles_select ON public.profiles FOR SELECT USING (TRUE);
CREATE POLICY profiles_insert ON public.profiles FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = id);
CREATE POLICY profiles_update ON public.profiles FOR UPDATE USING (auth.uid() IS NOT NULL AND auth.uid() = id);
CREATE POLICY profiles_delete ON public.profiles FOR DELETE USING (auth.uid() IS NOT NULL AND auth.uid() = id);

-- USER FOLLOWS POLICIES
CREATE POLICY follows_select ON public.user_follows FOR SELECT USING (TRUE);
CREATE POLICY follows_insert ON public.user_follows FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = follower_id);
CREATE POLICY follows_delete ON public.user_follows FOR DELETE USING (auth.uid() IS NOT NULL AND auth.uid() = follower_id);

-- PROJECTS POLICIES
CREATE POLICY projects_select ON public.projects FOR SELECT USING (
  visibility = 'public' OR (auth.uid() IS NOT NULL AND owner_id = auth.uid())
);
CREATE POLICY projects_insert ON public.projects FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = owner_id);
CREATE POLICY projects_update ON public.projects FOR UPDATE USING (auth.uid() IS NOT NULL AND auth.uid() = owner_id);
CREATE POLICY projects_delete ON public.projects FOR DELETE USING (auth.uid() IS NOT NULL AND auth.uid() = owner_id);

-- PROJECT MEMBERS POLICIES
CREATE POLICY project_members_select ON public.project_members FOR SELECT USING (TRUE);
CREATE POLICY project_members_insert ON public.project_members FOR INSERT WITH CHECK (
  auth.uid() IS NOT NULL AND EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND owner_id = auth.uid())
);
CREATE POLICY project_members_delete ON public.project_members FOR DELETE USING (
  auth.uid() IS NOT NULL AND (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND owner_id = auth.uid()))
);

-- COMMUNITIES POLICIES
CREATE POLICY communities_select ON public.communities FOR SELECT USING (
  visibility = 'public' OR (auth.uid() IS NOT NULL AND owner_id = auth.uid())
);
CREATE POLICY communities_insert ON public.communities FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = owner_id);
CREATE POLICY communities_update ON public.communities FOR UPDATE USING (auth.uid() IS NOT NULL AND auth.uid() = owner_id);

-- COMMUNITY MEMBERS POLICIES
CREATE POLICY community_members_select ON public.community_members FOR SELECT USING (TRUE);
CREATE POLICY community_members_insert ON public.community_members FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);
CREATE POLICY community_members_delete ON public.community_members FOR DELETE USING (
  auth.uid() IS NOT NULL AND (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.communities WHERE id = community_id AND owner_id = auth.uid()))
);

-- POSTS POLICIES
CREATE POLICY posts_select ON public.posts FOR SELECT USING (visibility = 'public' OR (auth.uid() IS NOT NULL AND author_id = auth.uid()));
CREATE POLICY posts_insert ON public.posts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = author_id);
CREATE POLICY posts_update ON public.posts FOR UPDATE USING (auth.uid() IS NOT NULL AND auth.uid() = author_id);
CREATE POLICY posts_delete ON public.posts FOR DELETE USING (auth.uid() IS NOT NULL AND auth.uid() = author_id);

-- COMMENTS POLICIES
CREATE POLICY comments_select ON public.comments FOR SELECT USING (TRUE);
CREATE POLICY comments_insert ON public.comments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = author_id);
CREATE POLICY comments_update ON public.comments FOR UPDATE USING (auth.uid() IS NOT NULL AND auth.uid() = author_id);
CREATE POLICY comments_delete ON public.comments FOR DELETE USING (auth.uid() IS NOT NULL AND auth.uid() = author_id);

-- REACTIONS POLICIES
CREATE POLICY reactions_select ON public.reactions FOR SELECT USING (TRUE);
CREATE POLICY reactions_insert ON public.reactions FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);
CREATE POLICY reactions_delete ON public.reactions FOR DELETE USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- BOOKMARKS POLICIES
CREATE POLICY bookmarks_select ON public.bookmarks FOR SELECT USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);
CREATE POLICY bookmarks_insert ON public.bookmarks FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);
CREATE POLICY bookmarks_delete ON public.bookmarks FOR DELETE USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- NOTIFICATIONS POLICIES
CREATE POLICY notifications_select ON public.notifications FOR SELECT USING (auth.uid() IS NOT NULL AND auth.uid() = recipient_id);
CREATE POLICY notifications_update ON public.notifications FOR UPDATE USING (auth.uid() IS NOT NULL AND auth.uid() = recipient_id);

-- COLLABORATION REQUESTS POLICIES
CREATE POLICY collab_select ON public.project_collaboration_requests FOR SELECT USING (
  auth.uid() IS NOT NULL AND (auth.uid() = requester_id OR auth.uid() = recipient_id)
);
CREATE POLICY collab_insert ON public.project_collaboration_requests FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = requester_id);
CREATE POLICY collab_update ON public.project_collaboration_requests FOR UPDATE USING (
  auth.uid() IS NOT NULL AND (auth.uid() = recipient_id OR auth.uid() = requester_id)
);

-- REPORTS POLICIES
CREATE POLICY reports_select ON public.reports FOR SELECT USING (auth.uid() IS NOT NULL AND auth.uid() = reporter_id);
CREATE POLICY reports_insert ON public.reports FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = reporter_id);

-- MODERATION ACTIONS POLICIES
CREATE POLICY moderation_select ON public.moderation_actions FOR SELECT USING (auth.uid() IS NOT NULL AND auth.uid() = moderator_id);
