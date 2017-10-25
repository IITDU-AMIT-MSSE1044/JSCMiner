/**
 * Created by Misu Be Imp on 10/24/2017.
 */
index.search("Oracle database", {
    fields: {
        title: {boost: 2},
        body: {boost: 1}
    }
});