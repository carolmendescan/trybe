def exists_word(word, instance):
    return finder(word, instance, False)


def search_by_word(word, instance):
    return finder(word, instance, True)


def finder(word, instance, content):
    word_occurrences = []

    for file_index in range(len(instance)):
        file = instance.search(file_index)
        occurrences = create_info(word, file, content)

        if occurrences:
            word_occurrences.append(
                {
                    "palavra": word,
                    "arquivo": file["nome_do_arquivo"],
                    "ocorrencias": occurrences,
                }
            )

    return word_occurrences


def create_info(word, file, content):
    occurrences = []

    for line, sentence in enumerate(file["linhas_do_arquivo"], start=1):
        if word.lower() in sentence.lower():
            if content:
                occurrences.append({"linha": line, "conteudo": sentence})
            else:
                occurrences.append({"linha": line})

    return occurrences
