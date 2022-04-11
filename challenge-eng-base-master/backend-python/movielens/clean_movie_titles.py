def clean_movie_titles(self, row):
    find_this = ", The ("

    if find_this not in row[1]:
        return row

    row[1] = "The " + row[1].replace(find_this, " (")

    return row
