def get_unique_per_source(dfs, column, names=None):
    """Print number of unique entries for a column in each dataframe
    """
    for i1, df1 in enumerate(dfs):
        if names:
            name1 = names[i1]
        else:
            name1 = str(i1)
        print("{} {}".format(name1, len(df1)))
        for i2, df2 in enumerate(dfs):
            if i1 == i2:
                continue
            if names:
                name2 = names[i2]
            else:
                name2 = str(i2)
            missing = set(df1[column]) - set(df2[column])
            print(' - {} in {} not in {}'.format(len(missing), name1, name2))
