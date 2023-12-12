SELECT a.nome AS artista,
al.nome AS album

FROM artista AS a
INNER JOIN Album as al ON a.id = al.artista_id
WHERE a.nome = 'Elis Regina'
ORDER BY album;
