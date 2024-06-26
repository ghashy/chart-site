--! get_auth_user_data_by_username
SELECT id, username, password_hash
FROM users
WHERE username = :username;

--! get_auth_user_data_by_id
SELECT id, username, password_hash
FROM users
WHERE id = :id;

--! get_user_permissions
SELECT DISTINCT permissions.name
FROM users
JOIN users_groups
ON users.id = users_groups.users_id
JOIN groups_permissions
ON users_groups.groups_id = groups_permissions.groups_id
JOIN permissions
ON groups_permissions.permissions_id = permissions.id
WHERE users.id = :user_id;
