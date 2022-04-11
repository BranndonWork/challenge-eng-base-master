def replace_missing_vals_with_zero(self, values):
    for index, _ in enumerate(values):
        if values[index] == "":
            values[index] = 0
    return values
