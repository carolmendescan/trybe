SELECT song.nome AS cancao,
COUNT(history.cancoes_idcancoes) AS reproducoes

FROM cancoes AS song
INNER JOIN historico AS history ON song.idcancoes = history.cancoes_idcancoes

GROUP BY cancao
ORDER BY reproducoes DESC, cancao
LIMIT 2;
