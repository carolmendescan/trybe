SELECT a.nome AS artista,
al.nome AS album,
COUNT(a.nome) AS pessoas_seguidoras

FROM artista AS a
INNER JOIN Album AS al
ON a.id = al.artista_id
INNER JOIN following_artist AS fa
ON fa.artista_id = al.artista_id

GROUP BY artista, album
ORDER BY pessoas_seguidoras DESC, artista, album;
