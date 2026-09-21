export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          display_name: string
          bio: string
          avatar_url: string
          location: string
          website_url: string
          github_url: string
          skills: string[]
          experience_level: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          display_name: string
          bio?: string
          avatar_url?: string
          location?: string
          website_url?: string
          github_url?: string
          skills?: string[]
          experience_level?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          display_name?: string
          bio?: string
          avatar_url?: string
          location?: string
          website_url?: string
          github_url?: string
          skills?: string[]
          experience_level?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_follows: {
        Row: {
          follower_id: string
          following_id: string
          created_at: string
        }
        Insert: {
          follower_id: string
          following_id: string
          created_at?: string
        }
        Update: {
          follower_id?: string
          following_id?: string
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          owner_id: string
          name: string
          slug: string
          description: string
          repository_url: string
          website_url: string
          license: string
          visibility: 'public' | 'private'
          status: 'active' | 'archived' | 'maintenance' | 'looking_for_contributors'
          primary_language: string
          topics: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          slug: string
          description?: string
          repository_url?: string
          website_url?: string
          license?: string
          visibility?: 'public' | 'private'
          status?: 'active' | 'archived' | 'maintenance' | 'looking_for_contributors'
          primary_language?: string
          topics?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          slug?: string
          description?: string
          repository_url?: string
          website_url?: string
          license?: string
          visibility?: 'public' | 'private'
          status?: 'active' | 'archived' | 'maintenance' | 'looking_for_contributors'
          primary_language?: string
          topics?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      project_members: {
        Row: {
          project_id: string
          user_id: string
          role: 'owner' | 'admin' | 'contributor' | 'viewer'
          created_at: string
        }
        Insert: {
          project_id: string
          user_id: string
          role?: 'owner' | 'admin' | 'contributor' | 'viewer'
          created_at?: string
        }
        Update: {
          project_id?: string
          user_id?: string
          role?: 'owner' | 'admin' | 'contributor' | 'viewer'
          created_at?: string
        }
      }
      communities: {
        Row: {
          id: string
          owner_id: string
          name: string
          slug: string
          description: string
          avatar_url: string
          banner_url: string
          visibility: 'public' | 'private'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          slug: string
          description?: string
          avatar_url?: string
          banner_url?: string
          visibility?: 'public' | 'private'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          slug?: string
          description?: string
          avatar_url?: string
          banner_url?: string
          visibility?: 'public' | 'private'
          created_at?: string
          updated_at?: string
        }
      }
      community_members: {
        Row: {
          community_id: string
          user_id: string
          role: 'owner' | 'moderator' | 'member'
          joined_at: string
        }
        Insert: {
          community_id: string
          user_id: string
          role?: 'owner' | 'moderator' | 'member'
          joined_at?: string
        }
        Update: {
          community_id?: string
          user_id?: string
          role?: 'owner' | 'moderator' | 'member'
          joined_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          author_id: string
          community_id: string | null
          project_id: string | null
          title: string
          body: string
          post_type: 'discussion' | 'announcement' | 'question' | 'showcase'
          visibility: 'public' | 'private'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_id: string
          community_id?: string | null
          project_id?: string | null
          title: string
          body?: string
          post_type?: 'discussion' | 'announcement' | 'question' | 'showcase'
          visibility?: 'public' | 'private'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          author_id?: string
          community_id?: string | null
          project_id?: string | null
          title?: string
          body?: string
          post_type?: 'discussion' | 'announcement' | 'question' | 'showcase'
          visibility?: 'public' | 'private'
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          post_id: string
          author_id: string
          parent_comment_id: string | null
          body: string
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          post_id: string
          author_id: string
          parent_comment_id?: string | null
          body: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          post_id?: string
          author_id?: string
          parent_comment_id?: string | null
          body?: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      reactions: {
        Row: {
          id: string
          user_id: string
          target_type: 'post' | 'comment'
          target_id: string
          reaction_type: 'like' | 'heart' | 'rocket' | 'fire'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          target_type: 'post' | 'comment'
          target_id: string
          reaction_type?: 'like' | 'heart' | 'rocket' | 'fire'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          target_type?: 'post' | 'comment'
          target_id?: string
          reaction_type?: 'like' | 'heart' | 'rocket' | 'fire'
          created_at?: string
        }
      }
      bookmarks: {
        Row: {
          id: string
          user_id: string
          target_type: 'post' | 'project'
          target_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          target_type: 'post' | 'project'
          target_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          target_type?: 'post' | 'project'
          target_id?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          recipient_id: string
          actor_id: string
          type: string
          entity_type: string
          entity_id: string
          read_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          recipient_id: string
          actor_id: string
          type: string
          entity_type: string
          entity_id: string
          read_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          recipient_id?: string
          actor_id?: string
          type?: string
          entity_type?: string
          entity_id?: string
          read_at?: string | null
          created_at?: string
        }
      }
      project_collaboration_requests: {
        Row: {
          id: string
          project_id: string
          requester_id: string
          recipient_id: string
          request_type: 'contributor' | 'maintainer' | 'support'
          message: string
          status: 'pending' | 'accepted' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          requester_id: string
          recipient_id: string
          request_type?: 'contributor' | 'maintainer' | 'support'
          message?: string
          status?: 'pending' | 'accepted' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          requester_id?: string
          recipient_id?: string
          request_type?: 'contributor' | 'maintainer' | 'support'
          message?: string
          status?: 'pending' | 'accepted' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
      reports: {
        Row: {
          id: string
          reporter_id: string
          target_type: 'post' | 'comment' | 'user' | 'project' | 'community'
          target_id: string
          reason: string
          status: 'pending' | 'reviewed' | 'dismissed' | 'actioned'
          created_at: string
        }
        Insert: {
          id?: string
          reporter_id: string
          target_type: 'post' | 'comment' | 'user' | 'project' | 'community'
          target_id: string
          reason: string
          status?: 'pending' | 'reviewed' | 'dismissed' | 'actioned'
          created_at?: string
        }
        Update: {
          id?: string
          reporter_id?: string
          target_type?: 'post' | 'comment' | 'user' | 'project' | 'community'
          target_id?: string
          reason?: string
          status?: 'pending' | 'reviewed' | 'dismissed' | 'actioned'
          created_at?: string
        }
      }
      moderation_actions: {
        Row: {
          id: string
          moderator_id: string
          target_type: 'post' | 'comment' | 'user' | 'project' | 'community'
          target_id: string
          action: 'warning' | 'remove_content' | 'ban_user' | 'dismiss'
          notes: string
          created_at: string
        }
        Insert: {
          id?: string
          moderator_id: string
          target_type: 'post' | 'comment' | 'user' | 'project' | 'community'
          target_id: string
          action: 'warning' | 'remove_content' | 'ban_user' | 'dismiss'
          notes?: string
          created_at?: string
        }
        Update: {
          id?: string
          moderator_id?: string
          target_type?: 'post' | 'comment' | 'user' | 'project' | 'community'
          target_id?: string
          action?: 'warning' | 'remove_content' | 'ban_user' | 'dismiss'
          notes?: string
          created_at?: string
        }
      }
    }
  }
}
