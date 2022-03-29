let এক্স = 2;
while (এক্স < 5) {
    লেখো(এক্স);
    এক্স = এক্স + 1;
}function লেখো(...args) { process.stdout.write([...args].join(' ')); }