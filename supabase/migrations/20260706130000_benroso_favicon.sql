-- Set default site favicon to bundled Benroso brand asset
update public.site_settings
set favicon_url = '/assets/benroso-favicon.png'
where singleton_key = 'default';
