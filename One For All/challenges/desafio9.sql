SELECT COUNT(*) AS musicas_no_historico
FROM pessoa_usuaria as user
INNER JOIN historico AS h
ON h.pessoa_usuaria_id = user.id
WHERE user.nome = 'Barbara Liskov';
