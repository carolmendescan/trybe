def sort_arr(arr):
    if len(arr) <= 1:
        return arr

    middle = len(arr) // 2
    left = arr[:middle]
    right = arr[middle:]

    left = sort_arr(left)
    right = sort_arr(right)

    return merg(left, right)


def merg(left, right):
    result = []
    left_idx, right_idx = 0, 0

    while left_idx < len(left) and right_idx < len(right):
        if left[left_idx] < right[right_idx]:
            result.append(left[left_idx])
            left_idx += 1
        else:
            result.append(right[right_idx])
            right_idx += 1

    result.extend(left[left_idx:])
    result.extend(right[right_idx:])
    return result


def is_anagram(first_string, second_string):
    def sort_letters(s):
        return "".join(sort_arr(list(s.lower())))

    if not first_string and not second_string:
        return "", "", False

    first_sorted = sort_letters(first_string)
    second_sorted = sort_letters(second_string)

    return first_sorted, second_sorted, first_sorted == second_sorted
