SELECT user.nome AS pessoa_usuaria,
IF (MAX(YEAR(history.data_reproducao)) >= 2021, 'Ativa', 'Inativa') AS status_pessoa_usuaria

FROM pessoa_usuaria AS user
INNER JOIN historico AS history ON user.id = history.pessoa_usuaria_id

GROUP BY pessoa_usuaria
ORDER BY pessoa_usuaria;
