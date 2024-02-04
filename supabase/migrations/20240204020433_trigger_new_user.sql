create trigger handle_new_user
  after insert on auth.users
  for each row
  execute function public.handle_new_user();