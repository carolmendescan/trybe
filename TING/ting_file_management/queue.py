from ting_file_management.abstract_queue import AbstractQueue


class Queue(AbstractQueue):
    def __init__(self):
        self._data = []

    def __len__(self):
        return len(self._data)

    def __contains__(self, value):
        return value in self._data

    def is_empty(self):
        return self._data == []

    def enqueue(self, value):
        self._data.append(value)

    def dequeue(self):
        if self.is_empty():
            raise Exception("A fila está vazia")
        return self._data.pop(0)

    def search(self, index):
        if index not in range(len(self._data)):
            raise IndexError("Índice Inválido ou Inexistente")
        return self._data[index]
