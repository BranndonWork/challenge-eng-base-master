def execute_sql_from_file(self, file_path):
    cursor = self.db.cursor()

    fh = open(file_path, "r")
    sql_file = fh.read()
    fh.close()

    sql_commands = sql_file.split(";")
    for command in sql_commands:
        command = " ".join(command.split())
        if command != "":
            cursor.execute(command)

    self.db.commit()
    cursor.close()
