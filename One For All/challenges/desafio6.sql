SELECT MIN(plan.valor) AS faturamento_minimo,
MAX(plan.valor) AS faturamento_maximo,
ROUND(AVG(plan.valor), 2) AS faturamento_medio,
ROUND(SUM(plan.valor), 2) AS faturamento_total

FROM planos AS plan
JOIN pessoa_usuaria
ON pessoa_usuaria.planos_id_planos = plan.id_planos;
