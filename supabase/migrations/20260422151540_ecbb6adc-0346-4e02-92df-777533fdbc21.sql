
DROP POLICY "Anyone can view avatars" ON storage.objects;

CREATE POLICY "Anyone can view avatar files"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'avatars' AND LOWER((storage.extension(name))) IN ('jpg', 'jpeg', 'png', 'gif', 'webp'));
