import csv


def db_insert(self, filename, table, columns, skip_header_row=True):
    cursor = self.db.cursor()

    with open(filename) as fh:
        csv_data = csv.reader(fh)

        if skip_header_row:
            next(csv_data)

        for row in csv_data:
            row = self.replace_missing_vals_with_zero(row)
            value_placeholders = self.get_value_placeholders(row)
            if table == "movies":
                row = self.clean_movie_titles(row)
            sql_command = (
                f"REPLACE INTO {table} ({columns}) VALUES({value_placeholders})"
            )
            cursor.execute(sql_command, row)

        self.db.commit()
        cursor.close()
