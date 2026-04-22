import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef, type FormEvent } from "react";
import { Camera, Save, X, Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { BadgeChip } from "@/components/ui/badge-chip";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — Talent Forge" },
      { name: "description", content: "Edit your profile, avatar, skills, and portfolio." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, profile, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [domain, setDomain] = useState("");
  const [college, setCollege] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/auth", search: { mode: "login" } });
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setBio(profile.bio || "");
      setDomain(profile.domain || "");
      setCollege(profile.college || "");
      setSkills(profile.skills || []);
      setAvatarUrl(profile.avatar_url);
    }
  }, [profile]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Avatar must be under 2 MB");
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${user.id}/avatar.${ext}`;

    const { error } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (error) {
      toast.error("Upload failed");
      setUploading(false);
      return;
    }

    const { data: publicUrl } = supabase.storage.from("avatars").getPublicUrl(path);
    const url = publicUrl.publicUrl + `?t=${Date.now()}`;
    setAvatarUrl(url);

    await supabase.from("profiles").update({ avatar_url: url }).eq("id", user.id);
    await refreshProfile();
    toast.success("Avatar updated!");
    setUploading(false);
  };

  const addSkill = () => {
    const s = newSkill.trim();
    if (s && !skills.includes(s) && skills.length < 20) {
      setSkills([...skills, s]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => setSkills(skills.filter((s) => s !== skill));

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim(),
        bio: bio.trim(),
        domain: domain.trim() || null,
        college: college.trim() || null,
        skills,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      toast.error("Failed to save");
    } else {
      toast.success("Profile saved! ✨");
      await refreshProfile();
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  const initials = fullName
    ? fullName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">
        My <span className="text-gradient">Profile</span>
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Update your profile to stand out to employers.
      </p>

      <form onSubmit={handleSave} className="mt-8 space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-5">
          <div className="relative">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="h-20 w-20 rounded-full border-2 border-border object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-button text-xl font-bold text-primary-foreground">
                {initials}
              </div>
            )}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-md transition hover:bg-primary/90"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </div>
          <div>
            <p className="font-semibold text-foreground">{fullName || "Your Name"}</p>
            <p className="text-xs text-muted-foreground">{profile?.tier || "Apprentice"} · TFES {profile?.tfes_score ?? 0}</p>
          </div>
        </div>

        {/* Fields */}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Full Name</span>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              maxLength={80}
              className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Domain</span>
            <input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="e.g. Full-Stack, ML, IoT"
              maxLength={100}
              className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium">College / University</span>
            <input
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="e.g. IIT Bombay"
              maxLength={120}
              className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium">Bio</span>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              maxLength={500}
              placeholder="Tell employers about yourself..."
              className="w-full resize-none rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
            <span className="mt-1 block text-right text-xs text-muted-foreground">{bio.length}/500</span>
          </label>
        </div>

        {/* Skills */}
        <div>
          <span className="mb-1.5 block text-sm font-medium">Skills</span>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <BadgeChip key={s} variant="Practitioner">
                {s}
                <button type="button" onClick={() => removeSkill(s)} className="ml-1">
                  <X className="h-3 w-3" />
                </button>
              </BadgeChip>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              placeholder="Add a skill"
              maxLength={40}
              className="flex-1 rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
            <Button type="button" size="sm" variant="outline" onClick={addSkill}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={saving}
          className="bg-gradient-button text-primary-foreground shadow-glow"
          size="lg"
        >
          {saving ? "Saving..." : "Save Profile"}
          {!saving && <Save className="ml-1.5 h-4 w-4" />}
        </Button>
      </form>
    </section>
  );
}
