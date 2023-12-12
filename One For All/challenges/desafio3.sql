SELECT user.nome AS pessoa_usuaria,
COUNT(history.cancoes_idcancoes) AS musicas_ouvidas,
ROUND(SUM(songs.duracao/60), 2) AS total_minutos

FROM pessoa_usuaria AS user
INNER JOIN historico AS history ON user.id = history.pessoa_usuaria_id
INNER JOIN cancoes AS songs ON songs.idcancoes = history.cancoes_idcancoes

GROUP BY pessoa_usuaria
ORDER BY pessoa_usuaria;
