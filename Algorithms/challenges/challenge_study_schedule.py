def study_schedule(permanence_period, target_time):
    try:
        students = 0

        for tempo_inicial, tempo_final in permanence_period:
            if tempo_inicial <= target_time <= tempo_final:
                students += 1

        return students

    except (ValueError, TypeError):
        return None

# Teste Manual
# permanence_periods = [(2, 2), (1, 2), (2, 3), (1, 5), (4, 5), (4, 5)]
# print(study_schedule(permanence_periods, 1))
