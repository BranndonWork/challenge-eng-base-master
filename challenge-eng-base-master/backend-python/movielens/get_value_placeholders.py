def get_value_placeholders(self, row):
    value_placeholders = []
    for _ in range(len(row)):
        value_placeholders.append("%s")
    return ",".join(value_placeholders)
